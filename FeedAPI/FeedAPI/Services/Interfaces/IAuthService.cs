using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Services.Implementations.AuthService;

namespace Services.Interfaces
{
    public interface IAuthService
    {
        public Task<int> LoginAsync(LoginData loginData);

        public  Task<bool> LogoutAsync(int userId);
    }
}
