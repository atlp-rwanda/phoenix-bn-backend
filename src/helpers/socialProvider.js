import passport from 'passport';

export function getProvider(req, res, next) {
  const { provider } = req.params;
  passport.authenticate(provider, {
    scope: ['profile', 'email'],
  })(req, res, next);
}
