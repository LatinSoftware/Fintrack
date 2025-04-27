using System;

namespace Fintrack.ApiService.Shared.Settings;

public class JwtSettings
{
    public static string SectionName {get;} = "JwtSettings";
    public string Issuer { get; set; } = default!;
    public string Audience { get; set; } = default!;
    public string SecretKey { get; set; } = default!;
    public int ExpiryMinutes { get; set; }
}
