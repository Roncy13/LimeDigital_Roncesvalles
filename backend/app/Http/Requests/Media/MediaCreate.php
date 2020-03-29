<?php

namespace App\Http\Requests\Media;

use Illuminate\Foundation\Http\FormRequest;

class MediaCreate extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'video' => [
                'required_without:photo',
                'mimetypes:video/mpeg,video/quicktime,video/3gp,video/mov',
                'max:8192'
            ],
            'photo' => [
                'required_without:video',
                'mimes:jpeg,bmp,png,jpg',
                'max:8192'
            ]
        ];
    }
}
