package nl.hva.wfis2024.esserver.rest;

import com.fasterxml.jackson.databind.node.ObjectNode;
import nl.hva.wfis2024.esserver.exeptions.BadRequestException;
import nl.hva.wfis2024.esserver.models.User;
import nl.hva.wfis2024.esserver.repositories.UserRepository;
import nl.hva.wfis2024.esserver.utils.JWToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AuthenticateController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JWToken jwtoken;


    @GetMapping("/authenticate")
    public ResponseEntity<List<User>> findAll() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(users);
    }

    @RequestMapping(value = "/authenticate/login", method = RequestMethod.POST,consumes = "application/json")
    public ResponseEntity<User> login (@RequestBody ObjectNode o) {
        User u = new User();
        try {
            u.seteMail(o.findValue("eMail").asText());
            u.setHashedPassword(o.findValue("password").asText());
        } catch (NullPointerException e) {
            throw new BadRequestException("Invalid input");
        }
        User user = userRepository.login(u);

        String token = jwtoken.encode(user.getName(), user.getId(), user.isAdmin());

        return ResponseEntity.accepted().header(HttpHeaders.AUTHORIZATION, "Bearer " + token).body(user);
    }

    public ResponseEntity<User> create(User o) {
        User user = userRepository.save(o);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }
}
