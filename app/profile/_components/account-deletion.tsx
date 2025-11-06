"use client"

import { BetterAuthActionButton } from "@/components/auth/better-auth-action-button"
import { authClient } from "@/auth-client"

export function AccountDeletion() {
    // TODO: Add success message display 
    // <p className="">{successMessage}</p> 
    
     // TODO: BUG: when deleting account,  user is receiving this error: 
     // {"code":"FAILED_TO_GET_USER_INFO","message":"Failed to get user info"}
     // ERRO ocorre apenas se o usuário acessar o link de deleção de conta em  navegador diferente daquele onde ele está logado.


  return (
    <BetterAuthActionButton
      requireAreYouSure
      variant="destructive"
      className="w-full"
      successMessage="Account deletion initiated. Please check your email to confirm."
      action={() => authClient.deleteUser({ callbackURL: "/" })}
    >
      Delete Account Permanently
    </BetterAuthActionButton>
  )
}