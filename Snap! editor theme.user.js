// ==UserScript==
// @name         Snap! editor theme
// @namespace    https://tapermonkey.net
// @version      0.1
// @description  new snap editor theme
// @author       ego-lay_atman-bay
// @match        https://snap.berkeley.edu/snap/snap.html
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    MorphicPreferences.isDark = !MorphicPreferences.isFlat

    IDE_Morph.prototype.darkDesign = function () {
    this.setDarkDesign();
    this.refreshIDE();
};

IDE_Morph.prototype.lightDesign = function () {
    this.setLightDesign();
    this.refreshIDE();
};

IDE_Morph.prototype.setDarkDesign = function () {
    MorphicPreferences.isDark = true;
    SpriteMorph.prototype.paletteColor = new Color(30, 30, 30);
    SpriteMorph.prototype.paletteTextColor = new Color(230, 230, 230);
    StageMorph.prototype.paletteTextColor
        = SpriteMorph.prototype.paletteTextColor;
    StageMorph.prototype.paletteColor = SpriteMorph.prototype.paletteColor;
    SpriteMorph.prototype.sliderColor
        = SpriteMorph.prototype.paletteColor.lighter(30);

    IDE_Morph.prototype.buttonContrast = 30;
    IDE_Morph.prototype.backgroundColor = new Color(10, 10, 10);
    IDE_Morph.prototype.frameColor = SpriteMorph.prototype.paletteColor;

    IDE_Morph.prototype.groupColor
        = SpriteMorph.prototype.paletteColor.lighter(5);
    IDE_Morph.prototype.sliderColor = SpriteMorph.prototype.sliderColor;
    IDE_Morph.prototype.buttonLabelColor = WHITE;
    IDE_Morph.prototype.tabColors = [
        IDE_Morph.prototype.groupColor.darker(50),
        IDE_Morph.prototype.groupColor.darker(25),
        IDE_Morph.prototype.groupColor
    ];
    IDE_Morph.prototype.rotationStyleColors = IDE_Morph.prototype.tabColors;
    IDE_Morph.prototype.appModeColor = BLACK;
    IDE_Morph.prototype.padding = 1;

    SpriteIconMorph.prototype.labelColor
        = IDE_Morph.prototype.buttonLabelColor;
    CostumeIconMorph.prototype.labelColor
        = IDE_Morph.prototype.buttonLabelColor;
    SoundIconMorph.prototype.labelColor
        = IDE_Morph.prototype.buttonLabelColor;
    TurtleIconMorph.prototype.labelColor
        = IDE_Morph.prototype.buttonLabelColor;

    SyntaxElementMorph.prototype.contrast = 65;
    ScriptsMorph.prototype.feedbackColor = WHITE;

	if (!MorphicPreferences.isFlat) {
    IDE_Morph.prototype.scriptsPaneTexture = this.scriptsTexture();
	} else {
	IDE_Morph.prototype.scriptsPaneTexture = null;
	}
};

IDE_Morph.prototype.setLightDesign = function () {
	MorphicPreferences.isDark = false;
    SpriteMorph.prototype.paletteColor = WHITE;
    SpriteMorph.prototype.paletteTextColor = new Color(70, 70, 70);
    StageMorph.prototype.paletteTextColor
        = SpriteMorph.prototype.paletteTextColor;
    StageMorph.prototype.paletteColor = SpriteMorph.prototype.paletteColor;
    SpriteMorph.prototype.sliderColor = SpriteMorph.prototype.paletteColor;

    IDE_Morph.prototype.buttonContrast = 30;
    IDE_Morph.prototype.backgroundColor = new Color(220, 220, 230);
    IDE_Morph.prototype.frameColor = new Color(240, 240, 245);

    IDE_Morph.prototype.groupColor = WHITE;
    IDE_Morph.prototype.sliderColor = SpriteMorph.prototype.sliderColor;
    IDE_Morph.prototype.buttonLabelColor = new Color(70, 70, 70);
    IDE_Morph.prototype.tabColors = [
        IDE_Morph.prototype.frameColor,
        IDE_Morph.prototype.frameColor.lighter(50),
        IDE_Morph.prototype.groupColor
    ];
    IDE_Morph.prototype.rotationStyleColors = IDE_Morph.prototype.tabColors;
    IDE_Morph.prototype.appModeColor = IDE_Morph.prototype.frameColor;
    IDE_Morph.prototype.padding = 1;

    SpriteIconMorph.prototype.labelColor
        = IDE_Morph.prototype.buttonLabelColor;
    CostumeIconMorph.prototype.labelColor
        = IDE_Morph.prototype.buttonLabelColor;
    SoundIconMorph.prototype.labelColor
        = IDE_Morph.prototype.buttonLabelColor;
    TurtleIconMorph.prototype.labelColor
        = IDE_Morph.prototype.buttonLabelColor;

    SyntaxElementMorph.prototype.contrast = 25;
    ScriptsMorph.prototype.feedbackColor = new Color(153, 255, 213);

	if (!MorphicPreferences.isFlat) {
    IDE_Morph.prototype.scriptsPaneTexture = this.scriptsTexture();
	} else {
	IDE_Morph.prototype.scriptsPaneTexture = null;
	}
};

IDE_Morph.prototype.setFlatDesign = function () {
    MorphicPreferences.isFlat = true;
    IDE_Morph.prototype.scriptsPaneTexture = null;
};

IDE_Morph.prototype.setDefaultDesign = function () {
    MorphicPreferences.isFlat = false;
    IDE_Morph.prototype.scriptsPaneTexture = this.scriptsTexture();
};

IDE_Morph.prototype.settingsMenu = function () {
    var menu,
        stage = this.stage,
        world = this.world(),
        pos = this.controlBar.settingsButton.bottomLeft(),
        shiftClicked = (world.currentKey === 16),
        on = new SymbolMorph(
            'checkedBox',
            MorphicPreferences.menuFontSize * 0.75
        ),
        off = new SymbolMorph(
            'rectangle',
            MorphicPreferences.menuFontSize * 0.75
        );

    function addPreference(label, toggle, test, onHint, offHint, hide) {
        if (!hide || shiftClicked) {
            menu.addItem(
                [
                    (test? on : off),
                    localize(label)
                ],
                toggle,
                test ? onHint : offHint,
                hide ? new Color(100, 0, 0) : null
            );
        }
    }

    menu = new MenuMorph(this);
    menu.addPair(
        [
            new SymbolMorph(
                'globe',
                MorphicPreferences.menuFontSize
            ),
            localize('Language...')
        ],
        'languageMenu'
    );
    menu.addItem(
        'Zoom blocks...',
        'userSetBlocksScale'
    );
    menu.addItem(
        'Fade blocks...',
        'userFadeBlocks'
    );
    menu.addItem(
        'Stage size...',
        'userSetStageSize'
    );
    if (shiftClicked) {
        menu.addItem(
            'Dragging threshold...',
            'userSetDragThreshold',
            'specify the distance the hand has to move\n' +
                'before it picks up an object',
            new Color(100, 0, 0)
        );
    }
    menu.addItem(
        'Microphone resolution...',
        'microphoneMenu'
    );
    menu.addLine();
    addPreference(
        'JavaScript extensions',
        () => {
            /*
            if (!Process.prototype.enableJS) {
                this.logout();
            }
            */
            Process.prototype.enableJS = !Process.prototype.enableJS;
            this.currentSprite.blocksCache.operators = null;
            this.currentSprite.paletteCache.operators = null;
            this.refreshPalette();
        },
        Process.prototype.enableJS,
        'uncheck to disable support for\nnative JavaScript functions',
        'check to support\nnative JavaScript functions' /* +
            '.\n' +
            'NOTE: You will have to manually\n' +
            'sign in again to access your account.' */
    );
    if (isRetinaSupported()) {
        addPreference(
            'Retina display support',
            'toggleRetina',
            isRetinaEnabled(),
            'uncheck for lower resolution,\nsaves computing resources',
            'check for higher resolution,\nuses more computing resources',
            true
        );
    }
    addPreference(
        'Input sliders',
        'toggleInputSliders',
        MorphicPreferences.useSliderForInput,
        'uncheck to disable\ninput sliders for\nentry fields',
        'check to enable\ninput sliders for\nentry fields'
    );
    if (MorphicPreferences.useSliderForInput) {
        addPreference(
            'Execute on slider change',
            'toggleSliderExecute',
            ArgMorph.prototype.executeOnSliderEdit,
            'uncheck to suppress\nrunning scripts\nwhen moving the slider',
            'check to run\nthe edited script\nwhen moving the slider'
        );
    }
    addPreference(
        'Turbo mode',
        'toggleFastTracking',
        this.stage.isFastTracked,
        'uncheck to run scripts\nat normal speed',
        'check to prioritize\nscript execution'
    );
    addPreference(
        'Visible stepping',
        'toggleSingleStepping',
        Process.prototype.enableSingleStepping,
        'uncheck to turn off\nvisible stepping',
        'check to turn on\n visible stepping (slow)',
        false
    );
    addPreference(
        'Log pen vectors',
        () => StageMorph.prototype.enablePenLogging =
            !StageMorph.prototype.enablePenLogging,
        StageMorph.prototype.enablePenLogging,
        'uncheck to turn off\nlogging pen vectors',
        'check to turn on\nlogging pen vectors',
        false
    );
    addPreference(
        'Ternary Boolean slots',
        () => BooleanSlotMorph.prototype.isTernary =
            !BooleanSlotMorph.prototype.isTernary,
        BooleanSlotMorph.prototype.isTernary,
        'uncheck to limit\nBoolean slots to true / false',
        'check to allow\nempty Boolean slots',
        true
    );
    addPreference(
        'Camera support',
        'toggleCameraSupport',
        CamSnapshotDialogMorph.prototype.enableCamera,
        'uncheck to disable\ncamera support',
        'check to enable\ncamera support',
        true
    );
    menu.addLine(); // everything visible below is persistent
    addPreference(
        'Blurred shadows',
        'toggleBlurredShadows',
        useBlurredShadows,
        'uncheck to use solid drop\nshadows and highlights',
        'check to use blurred drop\nshadows and highlights',
        true
    );
    addPreference(
        'Zebra coloring',
        'toggleZebraColoring',
        BlockMorph.prototype.zebraContrast,
        'uncheck to disable alternating\ncolors for nested block',
        'check to enable alternating\ncolors for nested blocks',
        true
    );
    addPreference(
        'Dynamic input labels',
        'toggleDynamicInputLabels',
        SyntaxElementMorph.prototype.dynamicInputLabels,
        'uncheck to disable dynamic\nlabels for variadic inputs',
        'check to enable dynamic\nlabels for variadic inputs',
        true
    );
    addPreference(
        'Prefer empty slot drops',
        'togglePreferEmptySlotDrops',
        ScriptsMorph.prototype.isPreferringEmptySlots,
        'uncheck to allow dropped\nreporters to kick out others',
        'settings menu prefer empty slots hint',
        true
    );
    addPreference(
        'Long form input dialog',
        'toggleLongFormInputDialog',
        InputSlotDialogMorph.prototype.isLaunchingExpanded,
        'uncheck to use the input\ndialog in short form',
        'check to always show slot\ntypes in the input dialog'
    );
    addPreference(
        'Plain prototype labels',
        'togglePlainPrototypeLabels',
        BlockLabelPlaceHolderMorph.prototype.plainLabel,
        'uncheck to always show (+) symbols\nin block prototype labels',
        'check to hide (+) symbols\nin block prototype labels'
    );
    addPreference(
        'Virtual keyboard',
        'toggleVirtualKeyboard',
        MorphicPreferences.useVirtualKeyboard,
        'uncheck to disable\nvirtual keyboard support\nfor mobile devices',
        'check to enable\nvirtual keyboard support\nfor mobile devices',
        true
    );
    addPreference(
        'Clicking sound',
        () => {
            BlockMorph.prototype.toggleSnapSound();
            if (BlockMorph.prototype.snapSound) {
                this.saveSetting('click', true);
            } else {
                this.removeSetting('click');
            }
        },
        BlockMorph.prototype.snapSound,
        'uncheck to turn\nblock clicking\nsound off',
        'check to turn\nblock clicking\nsound on'
    );
    addPreference(
        'Animations',
        () => this.isAnimating = !this.isAnimating,
        this.isAnimating,
        'uncheck to disable\nIDE animations',
        'check to enable\nIDE animations',
        true
    );
    addPreference(
        'Cache Inputs',
        () => {
            BlockMorph.prototype.isCachingInputs =
                !BlockMorph.prototype.isCachingInputs;
        },
        BlockMorph.prototype.isCachingInputs,
        'uncheck to stop caching\ninputs (for debugging the evaluator)',
        'check to cache inputs\nboosts recursion',
        true
    );
    addPreference(
        'Rasterize SVGs',
        () => MorphicPreferences.rasterizeSVGs =
            !MorphicPreferences.rasterizeSVGs,
        MorphicPreferences.rasterizeSVGs,
        'uncheck for smooth\nscaling of vector costumes',
        'check to rasterize\nSVGs on import',
        true
    );
    addPreference(
        'Flat design',
        () => {
            if (MorphicPreferences.isFlat) {
                return this.defaultDesign();
            }
            this.flatDesign();
        },
        MorphicPreferences.isFlat,
        'uncheck for default\nGUI design',
        'check for alternative\nGUI design',
        false
    );
	addPreference(
        'Dark design',
        () => {
            if (MorphicPreferences.isDark) {
                return this.lightDesign();
            }
            this.darkDesign();
        },
        MorphicPreferences.isDark,
        'uncheck for default\nGUI design',
        'check for alternative\nGUI design',
        false
    );
    addPreference(
        'Nested auto-wrapping',
        () => {
            ScriptsMorph.prototype.enableNestedAutoWrapping =
                !ScriptsMorph.prototype.enableNestedAutoWrapping;
            if (ScriptsMorph.prototype.enableNestedAutoWrapping) {
                this.removeSetting('autowrapping');
            } else {
                this.saveSetting('autowrapping', false);
            }
        },
        ScriptsMorph.prototype.enableNestedAutoWrapping,
        'uncheck to confine auto-wrapping\nto top-level block stacks',
        'check to enable auto-wrapping\ninside nested block stacks',
        true
    );
    addPreference(
        'Project URLs',
        () => {
            this.projectsInURLs = !this.projectsInURLs;
            if (this.projectsInURLs) {
                this.saveSetting('longurls', true);
            } else {
                this.removeSetting('longurls');
            }
        },
        this.projectsInURLs,
        'uncheck to disable\nproject data in URLs',
        'check to enable\nproject data in URLs',
        true
    );
    addPreference(
        'Sprite Nesting',
        () => SpriteMorph.prototype.enableNesting =
            !SpriteMorph.prototype.enableNesting,
        SpriteMorph.prototype.enableNesting,
        'uncheck to disable\nsprite composition',
        'check to enable\nsprite composition',
        true
    );
    addPreference(
        'First-Class Sprites',
        () => {
            SpriteMorph.prototype.enableFirstClass =
                !SpriteMorph.prototype.enableFirstClass;
            this.currentSprite.blocksCache.sensing = null;
            this.currentSprite.paletteCache.sensing = null;
            this.refreshPalette();
        },
        SpriteMorph.prototype.enableFirstClass,
        'uncheck to disable support\nfor first-class sprites',
        'check to enable support\n for first-class sprite',
        true
    );
    addPreference(
        'Keyboard Editing',
        () => {
            ScriptsMorph.prototype.enableKeyboard =
                !ScriptsMorph.prototype.enableKeyboard;
            this.currentSprite.scripts.updateToolbar();
            if (ScriptsMorph.prototype.enableKeyboard) {
                this.removeSetting('keyboard');
            } else {
                this.saveSetting('keyboard', false);
            }
        },
        ScriptsMorph.prototype.enableKeyboard,
        'uncheck to disable\nkeyboard editing support',
        'check to enable\nkeyboard editing support',
        true
    );
    addPreference(
        'Table support',
        () => {
            List.prototype.enableTables =
                !List.prototype.enableTables;
            if (List.prototype.enableTables) {
                this.removeSetting('tables');
            } else {
                this.saveSetting('tables', false);
            }
        },
        List.prototype.enableTables,
        'uncheck to disable\nmulti-column list views',
        'check for multi-column\nlist view support',
        true
    );
    if (List.prototype.enableTables) {
        addPreference(
            'Table lines',
            () => {
                TableMorph.prototype.highContrast =
                    !TableMorph.prototype.highContrast;
                if (TableMorph.prototype.highContrast) {
                    this.saveSetting('tableLines', true);
                } else {
                    this.removeSetting('tableLines');
                }
            },
            TableMorph.prototype.highContrast,
            'uncheck for less contrast\nmulti-column list views',
            'check for higher contrast\ntable views',
            true
        );
    }
    addPreference(
        'Live coding support',
        () => Process.prototype.enableLiveCoding =
            !Process.prototype.enableLiveCoding,
        Process.prototype.enableLiveCoding,
        'EXPERIMENTAL! uncheck to disable live\ncustom control structures',
        'EXPERIMENTAL! check to enable\n live custom control structures',
        true
    );
    addPreference(
        'JIT compiler support',
        () => {
            Process.prototype.enableCompiling =
                !Process.prototype.enableCompiling;
            this.currentSprite.blocksCache.operators = null;
            this.currentSprite.paletteCache.operators = null;
            this.refreshPalette();
        },
        Process.prototype.enableCompiling,
        'EXPERIMENTAL! uncheck to disable live\nsupport for compiling',
        'EXPERIMENTAL! check to enable\nsupport for compiling',
        true
    );
    menu.addLine(); // everything below this line is stored in the project
    addPreference(
        'Thread safe scripts',
        () => stage.isThreadSafe = !stage.isThreadSafe,
        this.stage.isThreadSafe,
        'uncheck to allow\nscript reentrance',
        'check to disallow\nscript reentrance'
    );
    addPreference(
        'Prefer smooth animations',
        'toggleVariableFrameRate',
        StageMorph.prototype.frameRate,
        'uncheck for greater speed\nat variable frame rates',
        'check for smooth, predictable\nanimations across computers',
        true
    );
    addPreference(
        'Flat line ends',
        () => SpriteMorph.prototype.useFlatLineEnds =
            !SpriteMorph.prototype.useFlatLineEnds,
        SpriteMorph.prototype.useFlatLineEnds,
        'uncheck for round ends of lines',
        'check for flat ends of lines'
    );
    addPreference(
        'Codification support',
        () => {
            StageMorph.prototype.enableCodeMapping =
                !StageMorph.prototype.enableCodeMapping;
            this.currentSprite.blocksCache.variables = null;
            this.currentSprite.paletteCache.variables = null;
            this.refreshPalette();
        },
        StageMorph.prototype.enableCodeMapping,
        'uncheck to disable\nblock to text mapping features',
        'check for block\nto text mapping features',
        false
    );
    addPreference(
        'Inheritance support',
        () => {
            StageMorph.prototype.enableInheritance =
                !StageMorph.prototype.enableInheritance;
            this.currentSprite.blocksCache.variables = null;
            this.currentSprite.paletteCache.variables = null;
            this.refreshPalette();
        },
        StageMorph.prototype.enableInheritance,
        'uncheck to disable\nsprite inheritance features',
        'check for sprite\ninheritance features',
        true
    );
    addPreference(
        'Hyper blocks support',
        () => Process.prototype.enableHyperOps =
            !Process.prototype.enableHyperOps,
        Process.prototype.enableHyperOps,
        'uncheck to disable\nusing operators on lists and tables',
        'check to enable\nusing operators on lists and tables',
        false
    );
    addPreference(
        'Persist linked sublist IDs',
        () => StageMorph.prototype.enableSublistIDs =
            !StageMorph.prototype.enableSublistIDs,
        StageMorph.prototype.enableSublistIDs,
        'uncheck to disable\nsaving linked sublist identities',
        'check to enable\nsaving linked sublist identities',
        true
    );
    addPreference(
        'Enable command drops in all rings',
        () => RingReporterSlotMorph.prototype.enableCommandDrops =
            !RingReporterSlotMorph.prototype.enableCommandDrops,
        RingReporterSlotMorph.prototype.enableCommandDrops,
        'uncheck to disable\ndropping commands in reporter rings',
        'check to enable\ndropping commands in all rings',
        true
    );
    menu.popup(world, pos);
};
})();