"use client";

import React, { useLayoutEffect } from "react";
import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import Response from "@/lib/base/response";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { setCookie } from "../_lib/actions";

export default function SendVerificationOtp({
  res,
}: {
  res: Response<string | null>;
}) {
  const { push, refresh } = useRouter();

  useLayoutEffect(() => {
    if (res.isSuccess && res.data) {
      setCookie(res.data);

      return push("/auth/verify-otp");
    }
  }, [res, push]);

  return (
    <Modal isOpen={res.isFailure} radius="none" hideCloseButton={true}>
      <ModalContent>
        <ModalHeader>
          <h4>Info</h4>
        </ModalHeader>

        <ModalBody>
          <p className="text-sm">{res.message}</p>
        </ModalBody>

        <ModalFooter className="gap-3">
          <Button
            color="danger"
            radius="none"
            as={Link}
            href="/auth"
            onPress={() =>
              signOut({
                redirect: true,
              })
            }
          >
            Log out
          </Button>

          <Button color="warning" radius="none" onPress={refresh}>
            Retry
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
