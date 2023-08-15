package team.remember.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import team.remember.domain.Users;
import team.remember.repository.UsersRepository;


@Service
public class PrincipalDetailsService implements UserDetailsService {

    @Autowired
    private UsersRepository userRepository;

    // 시큐리티 session(Authentication(내부에 리턴값 전송))
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Users userEntity = userRepository.findByEmail(username);


        if(userEntity != null){
            return new PrincipalDetails(userEntity);
        }
        return null;
    }
}
