import { Routes } from '@angular/router';
import Analysis from './analysis/analysis';
import LunarPhase from './lunarphase/lunarphase';



export const routes: Routes = [
{
	path: 'analysis',
	component: Analysis,
},{
	path: 'lunarphase',
	component: LunarPhase,
}
];
