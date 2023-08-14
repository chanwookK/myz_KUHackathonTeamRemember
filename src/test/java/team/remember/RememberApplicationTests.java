package team.remember;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@SpringBootTest
class RememberApplicationTests {

	@Test
	void contextLoads() {
		String time1Str = "12:34:56"; // 첫 번째 시간 문자열 (시:분:초)
		String time2Str = "05:30:15"; // 두 번째 시간 문자열 (시:분:초)

		//포맷 지정
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss");

		// 문자열로부터 LocalTime 객체로 변환
		LocalTime time1 = LocalTime.parse(time1Str, formatter);
		LocalTime time2 = LocalTime.parse(time2Str, formatter);

		// 두 시간 덧셈 수행
		LocalTime result = time1.plusHours(time2.getHour())
				.plusMinutes(time2.getMinute())
				.plusSeconds(time2.getSecond());

		// 결과 출력 (시:분:초 형식으로 변환)
		String resultStr = result.format(formatter);
		System.out.println("두 시간의 덧셈 결과: " + resultStr);
	}

}
