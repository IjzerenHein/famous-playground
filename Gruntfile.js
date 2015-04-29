/*global module:false*/
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		eslint: {
			target: ['app/src/*.js', 'app/src/**/*.js'],
			options: {
				config: '.eslintrc'
			}
		},
		jscs: {
				src: ['app/src/*.js', 'app/src/**/*.js'],
				options: {
					config: '.jscsrc'
				}
		},
		lesslint: {
				src: ['app/styles/styles.less'],
				options: {
					imports: ['**/*.less'],
					csslint: {
						csslintrc: '.csslintrc'
					}
				}
		},
		'ftp-deploy': {
      build: {
        auth: {
          host: 'ftp.pcextreme.nl',
          port: 21,
          authKey: 'gloey.nl'
        },
        src: 'www',
        dest: '/domains/gloey.nl/htdocs/www/apps/ViewSequence'
      }
    },
		exec: {
			'build': 'webpack -d',
			'build-prod': 'webpack -p',
			'open': 'open www/index.html',
			'clean': 'rm -rf ./www',
			'serve': 'webpack-dev-server -d --inline --reload=localhost',
			'open-serve': 'open http://localhost:8080'
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-eslint');
	grunt.loadNpmTasks('grunt-jscs');
	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-lesslint');
	grunt.loadNpmTasks('grunt-ftp-deploy');

	// Default task.
	grunt.registerTask('default', ['eslint', 'jscs', 'lesslint', 'exec:build']);
	grunt.registerTask('prod', ['exec:clean', 'eslint', 'jscs', 'lesslint', 'exec:build-prod']);
	grunt.registerTask('open', ['exec:open']);
	grunt.registerTask('clean', ['exec:clean']);
	grunt.registerTask('serve', ['exec:open-serve', 'exec:serve']);
	grunt.registerTask('open-serve', ['exec:open-serve']);
	grunt.registerTask('deploy', ['eslint', 'jscs', 'lesslint', 'exec:build', 'ftp-deploy']);
};
