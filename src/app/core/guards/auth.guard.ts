import { AccountService } from 'src/app/account/account.service';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router);

  return accountService.currentUser$.pipe(
    map((user) => {
      if (user) {
        return true;
      } else {
        return router.createUrlTree(['account/login'], {
          queryParams: { returnUrl: state.url },
        });
      }
    })
  );
};
