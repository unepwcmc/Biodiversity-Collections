package com.unep.wcmc.biodiversity.repository;

import com.unep.wcmc.biodiversity.model.ForgetPasswordToken;
import org.springframework.data.repository.CrudRepository;

public interface ForgetPasswordTokenRepository extends CrudRepository<ForgetPasswordToken, Long> {
	
	ForgetPasswordToken findByToken(String token);
}
