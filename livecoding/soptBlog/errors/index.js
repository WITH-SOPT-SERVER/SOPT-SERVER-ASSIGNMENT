const errorMap = {
    ParameterError: require('./ParameterError'),
    DatabaseError: require('./DatabaseError'),
    AuthorizationError: require('./AuthorizationError')
};

module.exports = errorMap;
