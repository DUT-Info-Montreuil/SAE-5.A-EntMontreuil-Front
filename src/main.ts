import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

topbar.config({
  autoRun: true,
  barThickness: 2,
  barColors: {
    '0': 'rgb(37 99 235)', // Bleu vif
    '.3': 'rgb(29 78 216)', // Bleu légèrement plus foncé
    '1.0': 'rgb(21 58 197)' // Bleu encore plus foncé
  },
  shadowBlur: 5,
  shadowColor: 'rgba(0, 0, 0, .5)',
  className: 'topbar',
})
/*ENT Montreuil is a Desktop Working Environnement for the students of the IUT of Montreuil
    Copyright (C) 2024  Steven CHING, Emilio CYRIAQUE-SOURISSEAU ALVARO-SEMEDO, Ismail GADA, Yanis HAMANI, Priyank SOLANKI

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.*/