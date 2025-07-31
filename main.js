const { Plugin } = require('obsidian');

module.exports = class CatIconInjector extends Plugin {
  async onload() {
    console.log("🐾 Cat Icon Plugin Loaded");

    const tryInsert = async () => {
      const ribbon = document.querySelector(".workspace-ribbon.mod-left");
      if (!ribbon) return setTimeout(tryInsert, 300);

      if (document.getElementById("cat-icons")) {
        console.log("🚫 Icon container already exists.");
        return;
      }

      const container = document.createElement("div");
      container.id = "cat-icons";
      container.style.margin = "12px auto";
      container.style.display = "flex";
      container.style.flexDirection = "column";
      container.style.alignItems = "center";
      container.style.gap = "6px";

      const iconFiles = [
        ".obsidian/plugins/cat-icon-injector/icons/cat.png",
        ".obsidian/plugins/cat-icon-injector/icons/heart.png",        
        ".obsidian/plugins/cat-icon-injector/icons/toilet paper.png"
      ];

      for (const relPath of iconFiles) {
        const resourcePath = this.app.vault.adapter.getResourcePath(relPath);
        const img = document.createElement("img");
        img.src = resourcePath;
        img.style.width = "32px";
        img.style.height = "32px";
        img.style.objectFit = "contain";
        container.appendChild(img);
      }

      ribbon.prepend(container);
      console.log("✅ Cat icons inserted.");
    };

    tryInsert();
  }

  onunload() {
    const container = document.getElementById("cat-icons");
    if (container) container.remove();
    console.log("🧹 Cat Icons Removed");
  }
};
