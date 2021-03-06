define('breakaway-view', ['jquery', 'underscore', 'backbone', 'sxs-view', './regs-router', 'breakaway-events', 'main-events', 'sidebar-events'], function($, _, Backbone, SxS, Router, BreakawayEvents, MainEvents, SidebarEvents) {
    'use strict';
    var BreakawayView = Backbone.View.extend({
        childViews: {},

        initialize: function() {
            this.externalEvents = BreakawayEvents;
            this.listenTo(this.externalEvents, 'sxs:open', this.openSxS);
        },

        openSxS: function(context) {
            context.url = context.regParagraph + '/' + context.docNumber + '?from_version=' + context.fromVersion;

            this.childViews.sxs = new SxS(context);

            if (Router.hasPushState) {
                Router.navigate('sxs/' + context.url);
            }

            MainEvents.trigger('breakaway:open', _.bind(this.removeChild, this));
            SidebarEvents.trigger('breakaway:open');
        },

        removeChild: function() {
            this.childViews.sxs.remove();
            delete(this.childViews.sxs);
        }
    });

    var breakaway = new BreakawayView();
    return breakaway;
});
