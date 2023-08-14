package team.remember.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import team.remember.domain.Users;

@Repository
public interface UsersRepository extends JpaRepository<Users, String> {
    public Users findByEmail(String email);
}
