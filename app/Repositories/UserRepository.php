<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Support\Collection;

class UserRepository implements UserRepositoryInterface
{
    public function getUsers(): Collection
    {
        return User::all();
    }

    public function saveUser(array $data)
    {
        return User::create($data);
    }

    public function updateUser($id, array $data)
    {
        $user = User::findOrFail($id);
        $user->update($data);

        return $user;
    }

    public function deleteUser($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        
        return true;
    }

}