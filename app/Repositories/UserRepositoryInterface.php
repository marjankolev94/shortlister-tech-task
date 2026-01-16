<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Support\Collection;

interface UserRepositoryInterface
{
    public function getUsers(): Collection;
    public function saveUser(array $data);
    public function updateUser(string $id, array $data);
    public function deleteUser(string $id);
}