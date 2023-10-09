import Claim from '../../domain/entities/claim.entity'
import Visitor from '../../domain/entities/visitor.entity'
import claimRepository ,{ClaimRepository} from '../../infrastructure/repositories/claim.repository'
import CreateClaimCommand from '../commands/create.claim.command'
import visitorRepository,{VisitorRepository} from '../../infrastructure/repositories/visitor.repository'

class CreateClaimHandler {
    private visitorRepository: VisitorRepository;
    private claimRepository: ClaimRepository;

    public constructor(
        visitorRepository: VisitorRepository,
        claimRepository: ClaimRepository
    ) {
        this.visitorRepository = visitorRepository;
        this.claimRepository = claimRepository;
    }

    public async execute(command: CreateClaimCommand): Promise<void> {
        // Obtener el visitante por su ID
        const owner = await this.visitorRepository.findOneById(
            command.getOwnerId()
        );

        if (!owner) {
            throw new Error('Owner does not exist');
        }

        // Validar el PIN del visitante
        const isPinValid = this.validatePin(owner, command.getVisitorPin());

        if (!isPinValid) {
            throw new Error('Visitor PIN is invalid');
        }

        // Crear el reclamo
        const claim = Claim.create(
            owner,
            command.getTitle(),
            command.getDescription(),
            command.getCategoryId(),
            command.getLocation(),
            command.getCreatedAt(),
            command.getCloneOf()
        );

        await this.claimRepository.save(claim);
    }

    private validatePin(visitor: Visitor, pin: string): boolean {
        // Comparar el PIN proporcionado con el PIN almacenado en la entidad Visitor
        return visitor.validatePin(pin);
    }
}

export default new CreateClaimHandler(
    visitorRepository,
    claimRepository
);