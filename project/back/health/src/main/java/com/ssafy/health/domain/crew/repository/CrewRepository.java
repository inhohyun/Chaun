package com.ssafy.health.domain.crew.repository;

import com.ssafy.health.domain.account.entity.User;
import com.ssafy.health.domain.crew.entity.Crew;
import com.ssafy.health.domain.exercise.entity.Exercise;
import jakarta.persistence.LockModeType;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CrewRepository extends JpaRepository<Crew, Long> {

    @Lock(LockModeType.OPTIMISTIC)
    @Query("select c from Crew c where c.id = :id")
    Crew findByIdWithOptimisticLock(Long id);

    @Query("SELECT c FROM Crew c " +
            "WHERE c.id NOT IN (SELECT b.homeCrew.id FROM Battle b WHERE b.status = 'STARTED')" +
            "AND c.id NOT IN (SELECT b.awayCrew.id FROM Battle b WHERE b.status = 'STARTED')" +
            "AND c.battleStatus = true " +
            "AND c.id <> :currentCrewId")
    List<Crew> findBattleReadyCrews(Long currentCrewId);

    @Query("SELECT COUNT(c) FROM Crew c WHERE (c.basicScore + c.activityScore) >= :totalScore")
    Long countCrewsWithHigherOrEqualScore(Float totalScore);

    @Query("SELECT c FROM Crew c JOIN FETCH c.exercise e WHERE e.id = :exerciseId ORDER BY (c.activityScore + c.basicScore) DESC")
    List<Crew> findByExerciseIdOrderByTotalScoreDesc(Long exerciseId);

    @Query("SELECT c FROM Crew c JOIN FETCH c.exercise WHERE c.id = :crewId")
    Optional<Crew> findCrewWithExerciseById(Long crewId);

    @Modifying
    @Query("UPDATE Crew c " +
            "SET c.basicScore = c.basicScore + :basicScore " +
            "WHERE c IN (" +
            "    SELECT uc.crew FROM UserCrew uc " +
            "    WHERE uc.user = :user " +
            "    AND uc.crew.exercise = :exercise" +
            ")")
    void updateCrewBasicScoreByUserAndExercise(User user, Exercise exercise, Float basicScore);
}
