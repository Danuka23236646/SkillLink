using Npgsql;
using Microsoft.Extensions.Configuration;

namespace Backend;

public static class ConnectionTest
{
    public static async Task TestConnection(string connectionString)
    {
        try
        {
            Console.WriteLine("Testing database connection...");
            Console.WriteLine($"Connection string: {connectionString}");
            
            using var connection = new NpgsqlConnection(connectionString);
            await connection.OpenAsync();
            
            Console.WriteLine("✅ Database connection successful!");
            
            // Test a simple query
            using var command = new NpgsqlCommand("SELECT version();", connection);
            var result = await command.ExecuteScalarAsync();
            Console.WriteLine($"Database version: {result}");
            
        }
        catch (Exception ex)
        {
            Console.WriteLine($"❌ Database connection failed: {ex.Message}");
            Console.WriteLine($"Exception type: {ex.GetType().Name}");
            
            if (ex.InnerException != null)
            {
                Console.WriteLine($"Inner exception: {ex.InnerException.Message}");
            }
        }
    }
}
