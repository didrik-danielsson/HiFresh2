package org.example.server;


import org.example.shared.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

    private static final String PASSWORD_PATTEN = "^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    public void registerUser(String username, String rawPassword) {

        if(validateNewUserName(username) && validateNewPassword(rawPassword)){

            String encodedPassword = passwordEncoder.encode(rawPassword);
            User newUser = new User(username, encodedPassword);
            userRepository.save(newUser);

        }
    }

    public boolean validateNewUserName(String username) {

        if (username.length() < 5) {
            throw new IllegalArgumentException("Användarnamnet måste vara 6 tecken");
        }
        else if(userRepository.existsByUsername(username)) {
            throw new IllegalArgumentException("Användaren finns redan");
        }
        return true;

    }

    public boolean validateNewPassword(String rawPassword) {

        if (rawPassword.length() < 8) {
            throw new IllegalArgumentException("Lösenordet måste vara minst 8 tecken.");
        }else if(!rawPassword.matches(PASSWORD_PATTEN)) {
            throw new IllegalArgumentException("Lösenordet måste vara minst 8 tecken långt, innehålla en versal, en siffra och ett specialtecken.");
        }
        return true;
    }

    public boolean authenticateUser(String username, String rawPassword) {
        User user = userRepository.findById(username).orElse(null);
        if (user == null) {
            return false;
        }
        return passwordEncoder.matches(rawPassword, user.getPassword());
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findById(username)
                .orElseThrow(() -> new UsernameNotFoundException("Hittade inte användaren: " + username));


        return org.springframework.security.core.userdetails.User
                .withUsername(user.getUsername())
                .password(user.getPassword())
                .authorities("USER")
                .build();
    }
}