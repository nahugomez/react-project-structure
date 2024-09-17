import { User } from "../../../domain/entities/User";
import { UserDTO } from "../dtos/UserDTO";

export class UserMapper {
  static toDomain(dto: UserDTO): User {
    return new User({
      id: dto.id,
      name: dto.name,
      email: dto.email,
    });
  }

  static toDomainList(dtos: UserDTO[]): User[] {
    return dtos.map((dto) => this.toDomain(dto));
  }
}
