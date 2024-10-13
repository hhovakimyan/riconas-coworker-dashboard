export class SetUserLanguageRequestDto {
  language!: string;
}

export class SetUserLanguageResponseDto {}

export class ChangeUserPasswordRequestDto {
  old_password!: string;

  new_password!: string;
}

export class ChangeUserPasswordResponseDto {}

export class GetUserDetailsResponseDto {
  id!: string;

  company_name!: string;
}