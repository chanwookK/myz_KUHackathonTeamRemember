package team.remember.auth;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.remember.domain.Users;
import team.remember.repository.UsersRepository;

@Service
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UsersRepository usersRepository;



    /*
     *
     * 구글로부터 받은 userRequest 데이터에 대한 후처리 함수
     *
     * */
    @Override
    @Transactional
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        /*
         *
         * 로그인버튼 -> 로그인 완료 -> code리턴 ->
         * 프로필을 통한 회원가입 진행
         *
         * */

        OAuth2User oAuth2User = super.loadUser(userRequest);

        String provider = userRequest.getClientRegistration().getClientName(); //google

        String email = oAuth2User.getAttribute("email");
        String realName = oAuth2User.getAttribute("name");
        String nickName = realName;
        BCryptPasswordEncoder bCryptPasswordEncoder1 = new BCryptPasswordEncoder();
        String password = bCryptPasswordEncoder1.encode("1234");
        int level = 0;


        Users userEntity = usersRepository.findByEmail(email);


        //강제 회원가입

        if(userEntity == null){
            userEntity = Users.builder()
                    .email(email)
                    .realName(realName)
                    .nickName(nickName)
                    .level(0)
                    .continuousNumOfExerciseDays(0)
                    .totalNumOfExerciseDays(0)
                    .provider(provider)
                    .password(password)
                    .build();
            usersRepository.save(userEntity);
        }

        return new PrincipalDetails(userEntity, oAuth2User.getAttributes());
    }

}
