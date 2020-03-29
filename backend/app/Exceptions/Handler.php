<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Validation\ValidationException;
use App\Utilities\StatusCodes;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];


    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        $statusCode = StatusCodes::SERVER_ERROR;
        $errors = [];
        
        if ($exception instanceof AuthorizationException) {
            
            $statusCode = StatusCodes::UNAUTHORIZED;

            return response()->json([
                'message' => $exception->getMessage(),
                'statusCode' => $statusCode,
                'error' => $errors
            ], $statusCode);
        } else if ($exception instanceof ValidationException) {
            
            $statusCode = StatusCodes::VALIDATION;
            $errors =  $exception->errors();

            return response()->json(
                [
                    'message' => $exception->getMessage(),
                    'statusCode' => $statusCode,
                    'errors' => $errors
                ]
            , $statusCode); 
            //
        }


        return response()->json(
            [
                'message' => $exception->getMessage(),
                'statusCode' => $statusCode
            ]
        , $statusCode);
    }
}
