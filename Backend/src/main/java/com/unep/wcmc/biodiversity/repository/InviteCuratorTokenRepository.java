package com.unep.wcmc.biodiversity.repository;

import com.unep.wcmc.biodiversity.model.InviteCuratorToken;
import org.springframework.data.repository.CrudRepository;

public interface InviteCuratorTokenRepository extends CrudRepository<InviteCuratorToken, Long> {

	InviteCuratorToken findByToken(String token);
}
