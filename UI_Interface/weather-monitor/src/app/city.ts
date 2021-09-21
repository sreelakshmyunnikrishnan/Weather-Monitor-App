export class City{
    constructor(
        public city:string,
        public description:string,
        public temp_now?:number,
        public icon?:string,
        public datetime?:number,
        public mlat?:number,
        public mlon?:number,
        public temp_max?:number,
        public temp_min?:number,
){}
}