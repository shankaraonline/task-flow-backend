import * as authService from "../services/auth.service";

export const login = async (req: any, res: any, next: any) => {

  try {

    const { username, password } = req.body;

    const result = await authService.login(username, password);

    res.json({
      success: true,
      token: result.token,
      user: result.user
    });

  } catch (err) {
    next(err);
  }

};