package team.remember.auth;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity //스프링 시큐리티 필터가 스프링 필터체인에 등록이 된다.
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true)
public class SecurityConfig {

    @Autowired
    private PrincipalOauth2UserService principalOauth2UserService;

    //비밀번호 암호화를 위한 스프링 빈
    @Bean
    public BCryptPasswordEncoder encodePwd(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http.csrf().disable();
        http.authorizeRequests()
                .anyRequest().permitAll() // 해당 url이 아닌 경우 모두 허용한다는 코드
                .and()
                .formLogin()//일반적인 로그인 방식의 성공, 실패처리를 사용
                //.usernameParameter("setusernamepar")
                .loginPage("/loginForm") //사용자가 따로 만든 로그인 페이지를 사용하려고 할때 설정한다.
                .defaultSuccessUrl("/loginRedirect")
                .loginProcessingUrl("/login")//login 주소가 호출이 되면 시큐리티가 낚아채서 대신 로그인을 진행해줌
                .and()
                .oauth2Login()
                .loginPage("/loginForm")
                .defaultSuccessUrl("/loginRedirect")
                .userInfoEndpoint()
                .userService(principalOauth2UserService);//구글 로그인이 완료된 뒤 후처리가 필요함. Tip 코드x,(엑세스토큰+사용자프로필정보O)

        /*
        http.oauth2Login()
                .defaultSuccessUrl("/") //로그인 성공시 주소
                .userInfoEndpoint()
                .userService(principalOauth2UserService);//구글 로그인이 완료된 뒤 후처리가 필요함. Tip 코드x,(엑세스토큰+사용자프로필정보O)

         */


        return http.build();
    }
}
