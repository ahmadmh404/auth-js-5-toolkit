import { CardWrapper } from "@/components/auth/card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const ErrorCard = () => {
  return (
    <CardWrapper
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      headerLabel="Oops, Something went wrong!"
    >
      <ExclamationTriangleIcon className="size-10 mx-auto text-destructive" />
    </CardWrapper>
  );
};
