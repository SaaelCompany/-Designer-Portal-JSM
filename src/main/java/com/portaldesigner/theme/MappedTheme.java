package com.portaldesigner.theme;

import java.util.ArrayList;
import java.util.List;

public final class MappedTheme {
    public final PortalTheme theme;
    public final List<String> warnings;

    public MappedTheme(PortalTheme theme, List<String> warnings) {
        this.theme = theme;
        this.warnings = warnings == null ? new ArrayList<String>() : warnings;
    }
}
