var gulp = require('gulp');
import { output as output } from 'psi'
import psi from 'psi'
import fs from 'fs';


gulp.task('mobile', done =>
    output('http://www.khuddam.org.uk/', {
        // key: key
        nokey: 'true',
        threshold: 20,
        // By default we use the PageSpeed Insights free (no API key) tier.
        // Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
        // key: 'YOUR_API_KEY'
        strategy: 'mobile',
    }, done)

);

gulp.task('desktop', done =>
    output('http://www.khuddam.org.uk/', {
        // key: key
        nokey: 'true',
        threshold: 20,
        // By default we use the PageSpeed Insights free (no API key) tier.
        // Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
        // key: 'YOUR_API_KEY'
        strategy: 'desktop',
    }, done)

);

export function savePsiReport(done) {

    psi('http://www.khuddam.org.uk/', {
        nokey: 'true',
        threshold: 20,
        strategy: 'mobile',
    }).then(data => {

        var time = Date.now();

        fs.writeFile(`./${time}mobile.json`, JSON.stringify([data.ruleGroups,data.pageStats]), function(err) {
            if (err) {
                return console.log(err);
            }
        });

    });

    psi('http://www.khuddam.org.uk/', {
        nokey: 'true',
        threshold: 20,
        strategy: 'desktop',
    }).then(data => {

        var time = Date.now();

        fs.writeFile(`./${time}desktop.json`, JSON.stringify([data.ruleGroups,data.pageStats]), function(err) {
            if (err) {
                return console.log(err);
            }
        });
    })
    done();
}
