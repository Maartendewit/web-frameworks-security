package nl.hva.wfis2024.esserver.utils;

import nl.hva.wfis2024.esserver.exeptions.UnAuthorizedException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Set;

@Component
public class JWTRequestFilter extends OncePerRequestFilter {
    @Value("${jwt.pass-phrase}")
    private String passphrase;
    
    private static final Set<String> SECURED_PATHS = Set.of("/scooters");
    
    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
        String servletPath = httpServletRequest.getServletPath();
        //OPTIONS requests and non-secured area should pass though without check
        if (HttpMethod.OPTIONS.matches(httpServletRequest.getMethod()) || SECURED_PATHS.stream().noneMatch(servletPath::startsWith)) {
            filterChain.doFilter(httpServletRequest, httpServletResponse);
            return;
        }
        JWToken jwToken = null;
        //Get the encrypted token string form the authorization request header
        String encryptedToken = httpServletRequest.getHeader(HttpHeaders.AUTHORIZATION);
        //Block the request if no token was found
        if (encryptedToken != null) {
            //Remove the "Bearer " token prefix, if used
            encryptedToken = encryptedToken.replace("Bearer ", "");
            //Decode the token
            jwToken = JWToken.decode(encryptedToken, this.passphrase);
        }
        //Validate the token
        if (jwToken == null) {
            httpServletResponse.sendError(HttpStatus.UNAUTHORIZED.value(), "You need to login first");
            //throw new UnAuthorizedException("You need to login first");
            return;
        }
        //Pass on the token info as an attribute for the request
        httpServletRequest.setAttribute(JWToken.JWT_ATTRIBUTE_NAME, jwToken);
        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }
}
