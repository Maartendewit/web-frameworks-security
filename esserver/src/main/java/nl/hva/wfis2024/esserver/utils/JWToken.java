package nl.hva.wfis2024.esserver.utils;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JWToken {

    public static final String JWT_USERNAME_CLAIM = "username";
    public static final String JWT_USERID_CLAIM = "id";
    public static final String JWT_ADMIN_CLAIM = "admin";
    public static final String JWT_ATTRIBUTE_NAME = "attribute";

    @Value("${jwt.issuer:MyOrganisation}")
    private String issuer;
    @Value("${jwt.pass-phrase}")
    private String passphrase;
    @Value("${jwt.expiration-seconds}")
    private int expiration;

    private String username;
    private Long id;
    private boolean isAdmin;

    public JWToken() {
    }

    public JWToken(String username, Long id, boolean isAdmin) {
        this.username = username;
        this.id = id;
        this.isAdmin = isAdmin;
    }

    public String encode(String userName, Long userId, boolean admin) {
        Key key = getKey(passphrase);

        String token = Jwts.builder()
                .claim(JWT_USERNAME_CLAIM, userName)
                .claim(JWT_USERID_CLAIM, userId)
                .claim(JWT_ADMIN_CLAIM, admin)
                .setIssuer(issuer)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration * 1000L))
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
        return token;
    }

    private static Key getKey(String passphrase) {
        byte[] hmacKey = passphrase.getBytes(StandardCharsets.UTF_8);
        return new SecretKeySpec(hmacKey, SignatureAlgorithm.HS512.getJcaName());
    }

    public static JWToken decode(String token, String passphrase) {
        try {
            //Validate the token
            Key key = getKey(passphrase);
            Jws<Claims> jws = Jwts.parser().setSigningKey(key).parseClaimsJws(token);
            Claims claims = jws.getBody();
            return new JWToken(claims.get(JWT_USERNAME_CLAIM).toString(), Long.valueOf(claims.get(JWT_USERID_CLAIM).toString()), (boolean) claims.get(JWT_ADMIN_CLAIM));
        } catch (ExpiredJwtException | MalformedJwtException | UnsupportedJwtException | IllegalArgumentException | SignatureException e) {
            return null;
        }
    }
}
