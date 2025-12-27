const {
  createInviteService,
  getInvitesService,
  getProjectInvitesService,
  acceptInviteService
} = require("../services/invite.service");

const createInvite = async (req, res, next) => {
  try {
    const invite = await createInviteService(
      req.body,
      req.params.projectId,
      req.user.id
    );
    res.status(201).json({ success: true, invite });
  } catch (err) {
    next(err);
  }
};

const getProjectInvites = async (req, res, next) => {
  try {
    const invites = await getProjectInvitesService(req.params.projectId, req.user.id);
    res.status(200).json({ success: true, invites });
  } catch (err) {
    next(err);
  }
};

const getInvites = async (req, res, next) => {
    try {
    const invites = await getInvitesService();
    res.status(200).json({ success: true, invites });
  } catch (err) {
    next(err);
  }
}

const acceptInvite = async (req, res, next) => {
  try {
    const membership = await acceptInviteService(
      req.user.id,
      req.user.email
    );
    res.status(200).json({ success: true, membership });
  } catch (err) {
    next(err);
  }
};

module.exports = { createInvite, getInvites, getProjectInvites,  acceptInvite };
