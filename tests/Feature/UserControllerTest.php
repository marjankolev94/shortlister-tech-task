<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class UserControllerTest extends TestCase
{
    /**
     * Test user can be created successfully
     */
    public function test_user_can_be_created()
    {
        $data = [
            'full_name' => 'Test User',
            'email' => 'test.user@shortlister.com',
            'phone' => '+38970123456',
            'birth_date' => '1990-10-10',
        ];

        $response = $this->post('/users/store', $data);

        $response->assertRedirect('/');

        $this->assertDatabaseHas('users', [
            'email' => 'test.user@shortlister.com',
        ]);
    }

    /**
     * Test previously created users are listed on the Home Page
     */
    public function test_users_listed_home_page()
    {
        $response = $this->get('/');

        $response->assertStatus(200);

        $response->assertInertia(fn ($page) =>
            $page->component('Home')
                 ->where('users.0.full_name', 'Test User')
                 ->where('users.0.email', 'test.user@shortlister.com')
        );
    }

    /**
     * Test existing user can be updated successfully
     */
    public function test_user_can_be_updated()
    {
        $user = User::factory()->create();

        $response = $this->put("/users/{$user->id}", [
            'full_name' => 'Updated Name',
            'email' => $user->email,
            'phone' => $user->phone,
            'birth_date' => $user->birth_date,
        ]);

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'full_name' => 'Updated Name',
        ]);

    }

    /**
     * Test existing user can be deleted successfully
     */
    public function test_user_can_be_deleted()
    {
        $user = User::factory()->create();

        $response = $this->delete("/users/{$user->id}");

        $response->assertRedirect('/');

        $this->assertDatabaseMissing('users', [
            'id' => $user->id,
        ]);
    }
}
