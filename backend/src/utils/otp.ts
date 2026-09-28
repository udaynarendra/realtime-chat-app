import {createHash,randomInt} from 'crypto';
export const generateOtp=():string=>{
    return randomInt(100000,1000000).toString();
}
export const hashOtp=(otp:string):string=>{
    return createHash('sha256').update(otp,'utf8').digest('hex');
}