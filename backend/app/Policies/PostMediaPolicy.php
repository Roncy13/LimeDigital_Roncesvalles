<?php

namespace App\Policies;

use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use App\Models\PostMedia;
use App\Services\PostMediaServices;

class PostMediaPolicy
{
    use HandlesAuthorization;

    private $service;
    /**
     * Create a new policy instance.
     *
     * @return void
     */

    public function __construct(PostMediaServices $service)
    {
        $this->service = $service;
    }

    private function isPostOwndByUsr($user, $postMediaId) {
        $record = $this->service->findById($postMediaId);
        return $record->user_id === $user->id;
    }

    public function update(User $user, PostMedia $postMedia) {
        return true;//$this->isPostOwndByUsr($user, $postMedia->id);
    }
}
