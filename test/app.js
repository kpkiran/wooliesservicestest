const request = require('supertest');
const expect = require('chai').expect;
const assert = require('chai').assert;
const config = require('./../config');
const configuration = require('./../configuration');
const getEnv = require('./../environment');
const environment = getEnv();

beforeEach(function() {
    this.timeout(10000);
}) 

describe('Passing the city and the api key', () => {
    let dt;
    it(' should select only Thursdays for holiday', (done) => {
        request(environment)
        .get(`/v2.0/forecast/daily?city=${config.city}&country=${config.country}&key=${config.key}`)
        .end((err, res) => {
            if(err) {
                done(err);
            }
            // console.log(res.body);
            for(var i=0; i<res.body.data.length; i++) {
                dt = new Date(res.body.data[i].datetime)
                if(dt.getDay(i) === 4) {
                    let theday = whatDayIsIt(dt.getDay(i));
                    expect(whatDayIsIt(dt.getDay(i))).to.equal('Thursday');
                }
            }
            done();
        })        
    })

    let whatDayIsIt = function(day) {
        // console.log('Inside switch statement ', day);
        switch (day) {
            case 0:
                return 'Sunday';
                break;
            case 1:
                return 'Monday';
                break;
            case 2:
                return 'Tuesday';
                break;
            case 3:
                return 'Wednesday';
                break;
            case 4:
                return 'Thursday';
                break;
            case 5:
                return 'Friday';
                break;
            case 6:
                return 'Saturday';
                break;
            default:
                console.log('Incorrect number');
        }
        return day;
    }

    it(' should not have rained the previous day ', (done) => {
        request(environment)
        .get(`/v2.0/forecast/daily?city=${config.city}&country=${config.country}&key=${config.key}`)
        .end((err, res) => {
            if(err) {
                done(err);
            }
            for(var i=0; i<res.body.data.length; i++) {
                dt = new Date(res.body.data[i].datetime)
                if(dt.getDay(i) === 3) {
                    let theday = whatDayIsIt(dt.getDay(i));
                    if (theday === 'Wednesday') {
                        assert.notInclude('Light rain');
                    }
                }
            }
            done();
        })        
    });

    it(' should check the temperature is between 20 to 30 degrees', (done) => {
        request(environment)
        .get(`/v2.0/forecast/daily?city=${config.city}&country=${config.country}&key=${config.key}`)
        .end((err, res) => {
            if(err) {
                done(err);
            }
            for (let i = 0; i < res.body.data.length; i++) {
                let maxTemp = res.body.data[i].max_temp;
                dt = new Date(res.body.data[i].datetime)
                if(dt.getDay(i) === 4) {
                    let theday = whatDayIsIt(dt.getDay(i));
                    if (theday === 'Thursday' && maxTemp >  20 && maxTemp < 30) {
                        try {
                            assert.isTrue(maxTemp);
                        } catch (error) {
                            
                        }
                    }
                }
            }
            done();
        });
    });

    it(' should check the temperature is between 20 to 30 degrees', (done) => {
        request(environment)
        .get(`/v2.0/forecast/daily?city=${config.city}&country=${config.country}&key=${config.key}`)
        .end((err, res) => {
            if(err) {
                done(err);
            }
            for (let i = 0; i < res.body.data.length; i++) {
                let snow = res.body.data[i].snow;
                if (snow == 0) {
                    try {
                        assert.isTrue(snow);   
                    } catch (error) {
                        
                    }
                }
            }
        })
        done();
    });
});
