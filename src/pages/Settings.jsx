/** @format */

import { useState } from "react";
import {
  Cog6ToothIcon,
  UserCircleIcon,
  BellIcon,
  LanguageIcon,
  MoonIcon,
  SunIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

const Settings = () => {
  const [settings, setSettings] = useState({
    theme: "dark",
    language: "en",
    notifications: true,
    autoSave: true,
    exportQuality: "high",
    defaultTheme: "modern",
  });

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const settingSections = [
    {
      title: "Account",
      icon: <UserCircleIcon className="w-6 h-6" />,
      settings: [
        {
          name: "Email Notifications",
          description: "Receive email updates about your projects",
          type: "toggle",
          key: "notifications",
        },
        {
          name: "Auto Save",
          description: "Automatically save changes to your projects",
          type: "toggle",
          key: "autoSave",
        },
      ],
    },
    {
      title: "Appearance",
      icon: <MoonIcon className="w-6 h-6" />,
      settings: [
        {
          name: "Theme",
          description: "Choose your preferred theme",
          type: "select",
          key: "theme",
          options: [
            { value: "dark", label: "Dark" },
            { value: "light", label: "Light" },
            { value: "system", label: "System" },
          ],
        },
        {
          name: "Default Caption Theme",
          description: "Set your preferred caption style",
          type: "select",
          key: "defaultTheme",
          options: [
            { value: "modern", label: "Modern" },
            { value: "minimal", label: "Minimal" },
            { value: "bold", label: "Bold" },
            { value: "subtitle", label: "Subtitle" },
          ],
        },
      ],
    },
    {
      title: "Language",
      icon: <LanguageIcon className="w-6 h-6" />,
      settings: [
        {
          name: "Interface Language",
          description: "Choose your preferred language",
          type: "select",
          key: "language",
          options: [
            { value: "en", label: "English" },
            { value: "es", label: "Spanish" },
            { value: "fr", label: "French" },
            { value: "de", label: "German" },
          ],
        },
      ],
    },
    {
      title: "Export",
      icon: <ArrowPathIcon className="w-6 h-6" />,
      settings: [
        {
          name: "Export Quality",
          description: "Set the default quality for exported videos",
          type: "select",
          key: "exportQuality",
          options: [
            { value: "high", label: "High" },
            { value: "medium", label: "Medium" },
            { value: "low", label: "Low" },
          ],
        },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Settings</h1>
        <p className="text-light/60">
          Customize your DelpCap experience and preferences.
        </p>
      </div>

      <div className="space-y-8">
        {settingSections.map((section) => (
          <div key={section.title} className="bg-dark/50 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="text-primary">{section.icon}</div>
              <h2 className="text-xl font-semibold">{section.title}</h2>
            </div>
            <div className="space-y-6">
              {section.settings.map((setting) => (
                <div
                  key={setting.key}
                  className="flex items-center justify-between py-4 border-b border-light/10 last:border-0"
                >
                  <div>
                    <h3 className="font-medium">{setting.name}</h3>
                    <p className="text-sm text-light/60">
                      {setting.description}
                    </p>
                  </div>
                  <div className="flex items-center">
                    {setting.type === "toggle" ? (
                      <button
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings[setting.key] ? "bg-primary" : "bg-light/20"
                        }`}
                        onClick={() =>
                          handleSettingChange(
                            setting.key,
                            !settings[setting.key]
                          )
                        }
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings[setting.key]
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                    ) : (
                      <select
                        className="bg-dark/30 border border-light/10 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-primary"
                        value={settings[setting.key]}
                        onChange={(e) =>
                          handleSettingChange(setting.key, e.target.value)
                        }
                      >
                        {setting.options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button className="btn btn-primary">Save Changes</button>
      </div>
    </div>
  );
};

export default Settings;
