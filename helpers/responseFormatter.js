const defaultResponse = {
    meta: {
        code: 200,
        status: 'SUCCESS',
        message: 'success',
    },
    data: null,
};

let responseFormatter = {};

responseFormatter.success = ({ res, data = null, status = 'SUCCESS', message = 'success', code = 200}) => {
    const response = {
        code,
        status,
        message,
        data,
    };

    res.status(code).json(response);
};

responseFormatter.badRequest = ({ res, data = null, status = 'BAD_REQUEST', message = 'bad request' }) => {
    const response = {
        code: 400,
        status,
        message,
    };

    res.status(response.code).json(response);
};

responseFormatter.forbidden = ({ res, data = null, status = 'FORBIDDEN', message = 'forbidden' }) => {
    const response = {
        code: 403,
        status,
        message,
    };

    res.status(response.code).json(response);
};

responseFormatter.methodNotAllowed = ({ res, data = null, status = 'METHOD_NOT ALLOWED', message = 'Method not allowed' }) => {
    const response = {
        code: 405,
        status,
        message,
    };

    res.status(response.code).json(response);
};

responseFormatter.unauthorized = ({ res, data = null, status = 'UNAUTHORIZED', message = 'unauthorized' }) => {
    const response = {
        code: 401,
        status,
        message,
    };

    res.status(response.code).json(response);
};

responseFormatter.notFound = ({ res, status = 'NOT_FOUND', message = 'not found' }) => {
    const response = {
        code: 404,
        status,
        message,
    };

    res.status(response.code).json(response);
};

responseFormatter.error = ({ res, code = 500, data = null, status = 'INTERNAL_SERVER_ERROR', message = 'internal server error' }) => {
    const response = {
        code,
        status,
        message,
    };

    res.status(response.code).json(response);
};

module.exports = responseFormatter;