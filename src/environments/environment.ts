// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBdpS1JPl7QLutm5ozy4UTgMD9V_k1AKIs",
    authDomain: "tz-list-manager.firebaseapp.com",
    projectId: "tz-list-manager",
    storageBucket: "tz-list-manager.appspot.com",
    messagingSenderId: "906362040167",
    appId: "1:906362040167:web:63a5d9896e3d8e770989c2",
    measurementId: "G-62EJ7F7WCD"
  },
  apiURL: 'http://localhost:8000/api'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
