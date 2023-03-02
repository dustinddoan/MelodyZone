const {siteService} = require('../services')

const siteController = {
    async postSiteArgs(req, res, next) {
        try {
            const site = await siteService.postSiteArgs(req);
            res.json(site);
            
        } catch (error) {
            next(error)
        }
    },
    async getSiteArgs(req, res, next) {
        try {
            const site = await siteService.getSiteArgs(req);
            res.json(site);
            
        } catch (error) {
            next(error)
        }
    },
    async updateSite(req, res, next) {
        try {
            console.log('dustin ',req.body)
            const site = await siteService.updateSiteArgs(req);

            res.json(site);
            
        } catch (error) {
            next(error)
        }
    }
}

module.exports = siteController