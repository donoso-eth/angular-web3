import { BigInt, log } from "@graphprotocol/graph-ts"
import {
  GratitudeContract,
  Approval,
  ApprovalForAll,
  GratitudTokenAceptedEvent,
  GratitudTokenChangeStatusEvent,
  GratitudeCampaignCreatedEvent,
  GratitudeCampaignRejected,
  GratitudeCampaignVerified,
  GratitudeTokenCreationEvent,
  OwnershipTransferred,
  Transfer
} from "../generated/GratitudeContract/GratitudeContract"
import { GratitudeCampaign,GratitudeToken } from "../generated/schema"






export function handleGratitudeTokenCreationEvent(
  event: GratitudeTokenCreationEvent
): void {
  let token = new GratitudeToken(event.params.tokenId.toHex())
  token.status = event.params.status
  token.tokenUri = event.params.tokenUri
  token.receiver = event.params.receiver
  token.sender = event.params.sender
  token.save()
}

export function handleGratitudTokenAceptedEvent(
  event: GratitudTokenAceptedEvent
): void {
  let id = event.params.tokenId.toHex()
  let token = GratitudeToken.load(id)
  if (token !== null) {
  token.status = 4
  token.receiver = event.params.receiver
  token.save()
  }
}

export function handleGratitudTokenChangeStatusEvent(
  event: GratitudTokenChangeStatusEvent
): void {
  let id = event.params.tokenId.toHex()
  let token = GratitudeToken.load(id)
  if (token !== null) {
  token.status = token.status
  token.save()
  }
}

export function handleGratitudeCampaignCreatedEvent(
  event: GratitudeCampaignCreatedEvent
): void {
  let campaign = new GratitudeCampaign(event.params.campaignId.toHex())
  campaign.status = event.params.status
  campaign.campaignUri = event.params.campaignUri
  campaign.name = event.params.name
  campaign.campaign_creator = event.params.campaign_creator
  campaign.save()

}

export function handleGratitudeCampaignRejected(
  event: GratitudeCampaignRejected
): void {
  let id = event.params.campaignId.toHex()
  let campaign = GratitudeCampaign.load(id)
  if (campaign !== null) {
  campaign.status = 2
  campaign.save()
  }
}

export function handleGratitudeCampaignVerified(
  event: GratitudeCampaignVerified
): void {
  let id = event.params.campaignId.toHex()
  let campaign = GratitudeCampaign.load(id)
  if (campaign !== null) {
  campaign.status = 1
  campaign.save()
  }
}


