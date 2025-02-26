import FormInput from "@/common/ui/input";
import { FormProvider, useForm } from "react-hook-form";
import { schema, SignupSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateUserDocument } from "@/common/gql/graphql";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";

export default function Signup() {
  const methods = useForm<SignupSchema>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const router = useRouter();

  const [createUser] = useMutation(CreateUserDocument);
  const onClickSubmit = async (data: SignupSchema) => {
    try {
      const result = await createUser({
        variables: {
          createUserInput: {
            email: data.email,
            password: data.password,
            name: data.name,
          },
        },
      });
      console.log(result, "회원가입 결과확인");
      router.push("/login");
    } catch (e) {
      alert(e);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-6"
        onSubmit={methods.handleSubmit(onClickSubmit)}
      >
        <div className="font-semibold text-[18px] leading-6 text-center">
          회원가입
        </div>
        <div className="flex flex-col gap-4">
          <div className="font-medium text-[14px] leading-5 text-center text-[#333333]">
            회원가입을 위해 아래 빈칸을 모두 채워 주세요.
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="">이메일</label>
              <FormInput<SignupSchema>
                type="text"
                className="w-full min-h-10 rounded-lg py-2 px-4 border border-[#d4d3d3] font-normal text-[14px] leading-5 text-[#000000]"
                placeholder="이메일을 입력해 주세요."
                keyname="email"
              />
              <div className="font-normal text-3 leading-5 text-[#f66a6a]">
                {methods.formState.errors.email?.message}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">이름</label>
              <FormInput<SignupSchema>
                type="text"
                className="w-full min-h-10 rounded-lg py-2 px-4 border border-[#d4d3d3] font-normal text-[14px] leading-5 text-[#000000]"
                placeholder="이름을 입력해 주세요."
                keyname="name"
              />
              <div className="font-normal text-3 leading-5 text-[#f66a6a]">
                {methods.formState.errors.name?.message}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">비밀번호</label>
              <FormInput<SignupSchema>
                type="password"
                className="w-full min-h-10 rounded-lg py-2 px-4 border border-[#d4d3d3] font-normal text-[14px] leading-5 text-[#000000]"
                placeholder="비밀번호를 입력해 주세요."
                keyname="password"
              />
              <div className="font-normal text-3 leading-5 text-[#f66a6a]">
                {methods.formState.errors.password?.message}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">비밀번호 확인</label>
              <FormInput<SignupSchema>
                type="password"
                className="w-full min-h-10 rounded-lg py-2 px-4 border border-[#d4d3d3] font-normal text-[14px] leading-5 text-[#000000]"
                placeholder="비밀번호를 한번 더 입력해주세요."
                keyname="confirmPassword"
              />
              <div className="font-normal text-3 leading-5 text-[#f66a6a]">
                {methods.formState.errors.confirmPassword?.message}
              </div>
            </div>
          </div>
        </div>
        <button
          disabled={!methods.formState.isValid}
          className={`height-12 rounded-lg py-3 px-4  font-semibold text-[18px] leading-6 text-center ${
            methods.formState.isValid
              ? "bg-[#2974e5] text-[#ffffff]"
              : "bg-[#cccccc] text-[#666666]"
          }`}
        >
          회원가입
        </button>
      </form>
    </FormProvider>
  );
}
