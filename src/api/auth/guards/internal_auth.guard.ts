
import { NextFunction, Response } from 'express';
import { HttpException } from '../../../core/exception';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { Req } from '../../../core/types/custom.types';

export const InternalAuthGuard = async (req: Req, res: Response, next: NextFunction) => {
	try {
		const authToken: any = (req.headers['x-internal-token']);
		if (!authToken) throw new HttpException('Auth Token Missing in request headers', 401);
		
		console.log(authToken);
		console.log(process.env.INTERNAL_MS_SECRET);
		///Validate JWt
		const verify: any = jwt.verify(authToken, process.env.INTERNAL_MS_SECRET);

		next();
		
	} catch (error) {
		console.log(error);
		return res.status(401).send({error: 'Not Authorized'});
	}


};