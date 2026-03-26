import { Lock } from "lucide-react";
import SectionCard from "../sectioncard";
import Toggle from "../toggleswitch";

const Verification = () => {
  return (
    <SectionCard title="Two-Step Verification" icon={Lock}>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div>
          <p className="text-sm font-medium text-gray-800 leading-none">
            Two-Factor Auth
          </p>
          <p className="text-xs text-gray-400 mt-0.5">Require code at login</p>
          {/* <Toggle
                  // checked={profile.twoFactor}
                  // onChange={(v) => update("twoFactor", v)}
                // /> */}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-800 leading-none">
            Login Alerts
          </p>
          <p className="text-xs text-gray-400 mt-0.5">Email on new sign-in</p>
          {/* </div> */}
          {/* </div> */}
          {/* <Toggle
                  checked={profile.loginAlert}
                  onChange={(v) => update("loginAlert", v)}
                /> */}
        </div>
      </div>
    </SectionCard>
  );
};

export default Verification;
