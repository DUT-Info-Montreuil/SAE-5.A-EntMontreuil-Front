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
