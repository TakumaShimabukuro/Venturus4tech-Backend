import { Injectable } from "@nestjs/common";
import { Strategy, ExtractJwt } from "passport-jwt"
import { PassportStrategy } from "@nestjs/passport"
/* 
    nunca deve ser exposta publicamente
    a chave secreta si esta a mostra a fins de deixar claro o que o codigo esta fazendo. 
    Em um ambiente de produçao, a chave deve estar protegido por medidas apropriadas 
    (como por exemplo secret vaults, variaveis de ambiente ou servicos de configuração) 
*/
export const secretKey = "qwerty"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secretKey
        })
    }

    async validate(payload: any) {
        return { userLogin: payload.userLogin };
    }
}