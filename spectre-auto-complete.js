$.fn.extend({
  autoComplete: function(options) {
    function debounce(func, wait, immediate) {
      let timeout;
      return function() {
        let context = this,
          args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
      };
    }

    function isElement(element) {
      return element instanceof Element || element instanceof HTMLDocument;
    }

    function defaultRender(value, source, $inpt, $menu, opts) {
      if (!value.length && !source.length) {
        $menu.empty().css("display", "none");

        return;
      }

      $menu.empty().css("display", "block");

      const menuItemClass = `menu-item not-found${
        opts.menuItemClass.length ? " " + opts.menuItemClass : ""
      }`;

      if (!source.length && value.length) {
        if (typeof opts.empty === "string") {
          $menu.append(`<div class="${menuItemClass}">${opts.empty}</div>`);
        } else if (isElement(opts.empty)) {
          $menu.append(opts.empty);
        }
      }

      for (let i = 0; i < source.length; i++) {
        const v = source[i];

        if (typeof v === "string") {
          $menu.append(
            `<div class="${menuItemClass}"><a href="javascript:void(0)">${v}</a></div>`
          );
        } else if (typeof v === "object") {
          const $menuItem = $(
            `<div class="${menuItemClass}"><a href="javascript:void(0)">${
              v.value
            }</a></div>`
          );

          if (typeof v.attribute === "object") {
            $menuItem.attr(v.attribute);
          }

          if (typeof v.data === "object") {
            $menuItem.data(v.data);
          }
        } else if (isElement(v)) {
          $menu.append(v);
        }

        continue;
      }
    }

    const opts = {};

    let caches = new Object();

    if (typeof options === "object") {
      opts["source"] = options.source || [];
      opts["render"] = options.render || defaultRender;
      opts["error"] = options.error || console.error;

      opts["delay"] = options.delay || 0;
      opts["minChar"] = options.minChar || 0;
      opts["menuClass"] = options.menuClass || "";
      opts["menuItemClass"] = options.menuItemClass || "";

      opts["empty"] = options.empty || "Not Found";

      opts["cache"] = options.cache || false;
      opts["clearCacheInterval"] = options.clearCacheInterval || 1000 * 60 * 10;

      opts["runOnFocus"] = options.runOnFocus || true;
    }

    if (opts.cache) {
      if (opts.clearCacheInterval) {
        setInterval(function() {
          caches = new Object();
        }, opts.clearCacheInterval);
      }
    }

    const $container = $(this);
    const $inpt = this.find(".form-input");
    let $menu = $inpt.siblings(".menu");

    if (!$menu.length) {
      $menu = $(
        `<div class="menu${
          opts.menuClass.length ? " " + opts.menuClass : ""
        }"></div>`
      );
      $inpt.after($menu);
    }

    $container.addClass("spectre-auto-complete-container");

    const handler = debounce(function(event) {
      const $inpt = event.data.$inpt;

      if (event.which === 27) {
        event.data.$menu.css("display", "none");
        $inpt.blur();
      } else if (event.which === 38 || event.which === 40) {
        const $menu = event.data.$menu;
        const $menuItems = $menu.find(".menu-item");
        const $menuItem_hover = $menuItems.filter(".hover");
        let $menuItem;

        if ($menuItem_hover.length) {
          const currentIndex = $menuItem_hover.index();
          let newIndex;

          if (event.which === 38) {
            if (currentIndex === 0) {
              newIndex = $menuItems.length - 1;
            } else {
              newIndex = currentIndex - 1;
            }
          } else {
            if (currentIndex === $menuItems.length - 1) {
              newIndex = 0;
            } else {
              newIndex = currentIndex + 1;
            }
          }

          $menuItem_hover.removeClass("hover");
          $menuItem = $menuItems.eq(newIndex).addClass("hover");
        } else {
          if (event.which === 40) {
            $menuItem = $menuItems.eq(0).addClass("hover");

            return;
          }
        }

        $menu.scrollTop(
          $menuItem.offset().top -
            $menu.offset().top +
            $menu.scrollTop() -
            $menu.height() / 2
        );
      } else if (event.which === 13) {
        const $menuItem_hover = $menu.find(".hover");

        if ($menuItem_hover.length) {
          $menuItem_hover.trigger("click");
        }
      } else {
        const $container = event.data.$container;

        let value = $inpt.val();
        const opts = event.data.opts;

        if (value.length >= opts.minChar) {
          const source = opts.source;
          const render = opts.render;
          const error = opts.error;

          if (typeof source === "function") {
            if (opts.cache) {
              const caches = event.data.caches;

              if (caches[value]) {
                render(value, caches[value], $inpt, $menu, opts);

                return;
              }
            }

            const callback = (data, err) => {
              if (data) {
                if (opts.cache) {
                  event.data.caches[value] = data;
                }

                render(value, data, $inpt, $menu, opts);
              } else {
                error(err);
              }

              return;
            };

            source(value, callback, $container, $inpt, opts);
          } else if (Array.isArray(source)) {
            let data = [];

            if (value.length) {
              if (opts.cache) {
                const caches = event.data.caches;

                if (caches[value]) {
                  render(value, caches[value], $inpt, $menu, opts);

                  return;
                }
              }

              const regexpValue = new RegExp(value, "g");

              for (let i = 0; i < source.length; i++) {
                const v = source[i];

                if (typeof v === "string") {
                  if (regexpValue.test(v)) {
                    data.push(v.replace(regexpValue, "<mark>$&</mark>"));
                  }
                }

                continue;
              }

              if (opts.cache) {
                event.data.caches[value] = data;
              }
            }

            render(value, data, $inpt, $menu, opts);
          }
        }
      }

      return;
    }, opts.delay);

    $inpt.on(
      `keydown${options.runOnFocus ? " focus" : ""}`,
      {
        $container: $container,
        $inpt: $inpt,
        $menu: $menu,
        caches: caches,
        opts: opts
      },
      handler
    );

    $container.on(
      "click",
      ".menu-item, .menu-item a",
      {
        $inpt: $inpt
      },
      function(event) {
        const $inpt = event.data.$inpt;
        const $this = $(this);

        const $menu = $inpt.siblings(".menu");

        $this.removeClass("hover");

        const val = $this.data("value") || $this.find("a").text();

        $menu.css("display", "none");

        $inpt.val(val);

        return;
      }
    );

    $(document).on(
      "click",
      {
        $menu: $menu,
        $inpt: $inpt
      },
      function(event) {
        const $menu = event.data.$menu;

        if (
          !$.contains($menu.get(0), event.target) &&
          $inpt.get(0) !== event.target
        ) {
          $menu.css("display", "none");
        }

        return;
      }
    );
  }
});
