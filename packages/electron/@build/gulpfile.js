const gulp = require('gulp');
const del = require('del');



const PARCEL_BUILD = './output/parcel/build/**/*';



gulp.task('clear-output:parcel:build', function(){
	return del([ PARCEL_BUILD ], { force: true });
});
